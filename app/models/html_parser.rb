require 'nokogiri'
class HtmlParser
  def self.extract_first_img_src(html)
    doc = Nokogiri::HTML(html)
    if img = doc.xpath('//img').first
      return img.attr('src')
    end
  end
end
