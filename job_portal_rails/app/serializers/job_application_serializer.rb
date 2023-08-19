class JobApplicationSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :email, :phone_number, :address, :notice_period_in_month,
             :cctc, :ectc, :experience_in_years, :created_at

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
end
