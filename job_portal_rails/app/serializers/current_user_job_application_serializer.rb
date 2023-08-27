class CurrentUserJobApplicationSerializer
  include JSONAPI::Serializer
  attributes :id, :created_at

  belongs_to :job

  attribute :job_title do |object|
    object.job.title
  end

  attribute :application_resume_url do |object|
    if object.resume.attached?
      Rails.application.routes.url_helpers.rails_blob_path(object.resume, only_path: true)
    else
      nil
    end
  end

  attribute :company_name do |object|
    object.job.company.name
  end

  attribute :company_id do |object|
    object.job.company.id
  end

  attribute :job_location do |object|
    object.job.location
  end
end
