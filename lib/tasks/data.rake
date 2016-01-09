namespace :data do
  desc "create AnnotatedFile and Annotations from txt and xml files"
  # must have environment to use ActiveRecord in rake task
  task :load_data, [:filename] => :environment do |task, args|
    # for example: rake data:load_data['ch08']
    filename = args[:filename]
    raise "No filename provided for load_data rake task--bailing out." if filename.blank?
    puts "attempting to load data for #{filename}"

    file = AnnotatedFile.find_by(filename: 'ch08') || AnnotatedFile.new(filename: 'ch08')
    file.full_text = IO.read("data/text_files/#{file.filename}.txt")

    raw_xml = IO.read("data/xml_files/#{file.filename}.txt.xml")
    xml = Nokogiri::XML(raw_xml) {|config| config.strict}

    doc_id = xml.xpath('document').xpath('@DOCID').text
    puts "<document> DOCID is #{doc_id}"
    if (doc_id_prefix = doc_id.split('.').first) != filename
      raise "doc_id_prefix does NOT match filename provided--bailing out."
    end

    file.annotations = []

    spans = xml.xpath('//span')
    spans.each do | span_tag |
      category = span_tag.xpath('@category').text

      charseq_tag = span_tag.xpath('extent/charseq')
      start_index = charseq_tag.xpath('@START').text
      # end can't be used as a variable name, because it is a ruby keyword
      end_index = charseq_tag.xpath('@END').text
      string = charseq_tag.text

      annotation = Annotation.new(category: category,
                                                           start: start_index,
                                                           :end => end_index,
                                                           string_within_text: string)
      puts "#{span_tag}" 
      annotation.save
      p annotation
      puts "\n\n"
      file.annotations << annotation
    end

    file.save
    puts "Finished loading data for #{filename}"
  end

end
