CarrierWave.configure do |config|
  # if Rails.env.staging? || Rails.env.production?
  #   config.fog_provider = 'fog/aws'
    config.fog_credentials = {
      provider:               'AWS',
      aws_access_key_id:      ENV['AKIAXZLLUWB4FFO25VV2'],
      aws_secret_access_key:  ENV['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'],
      host: 's3-ap-northeast-1.amazonaws.com',
      region: 'ap-northeast-1'
    }
    config.fog_directory = ENV['projectsoundbar']
    config.fog_public     = false
  # else
  #   config.storage = :file
  #   config.enable_processing = Rails.env.development?
  # end
end

CarrierWave.configure do |config|
  # if Rails.env.staging? || Rails.env.production?
  #   config.fog_provider = 'fog/aws'
    config.fog_credentials = {
      provider:               'AWS',
      aws_access_key_id:      ENV['AWS_ACCESS_KEY_ID'],
      aws_secret_access_key:  ENV['AWS_SECRET_ACCESS_KEY'],
      host: 's3-ap-northeast-1.amazonaws.com',
      region: 'ap-northeast-1'
    }
    config.fog_directory = ENV['S3_BUCKET_NAME']
    config.fog_public     = false
  # else
  #   config.storage = :file
  #   config.enable_processing = Rails.env.development?
  # end
end