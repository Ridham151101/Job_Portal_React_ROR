class Api::V1::JobApplicationsController < ApplicationController
  load_and_authorize_resource

  def index
    @job_applications = current_user.job_applications
    serialized_job_applications = @job_applications.map { |job_applications| JobApplicationSerializer.new(job_applications).serializable_hash[:data][:attributes] }
    render json: { data: serialized_job_applications }
  end

  def create
    @job_application = current_user.job_applications.build(job_application_params)
    @job_application.job_id = params[:job_id]
    @job_application.resume.attach(params[:job_application][:resume]) if params[:job_application][:resume]

    if @job_application.save
      render json: {
        status: { code: 201, message: 'Job application submitted successfully.' },
        data: JobApplicationSerializer.new(@job_application).serializable_hash[:data][:attributes]
      }, status: :created
    else
      render json: { errors: job_application.errors }, status: :unprocessable_entity
    end
  end

  private

  def job_application_params
    params.require(:job_application).permit(
      :name, :email, :phone_number, :address,
      :notice_period_in_month, :cctc, :ectc, :experience_in_years, :resume
    )
  end
end
