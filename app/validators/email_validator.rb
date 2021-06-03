require 'mail'
class EmailValidator < ActiveModel::EachValidator
  def validate_each(record,attribute,value)
    begin
      mail = Mail::Address.new(value)
      validation = m.domain.present? && m.domain.match('\.') && m.address == value
    rescue
      validation = false
    end
    record.errors[attribute] << (options[:message] || "信箱格式不正確") unless validation
  end
end
