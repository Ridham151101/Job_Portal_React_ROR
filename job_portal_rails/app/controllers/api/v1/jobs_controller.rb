class Api::V1::JobsController < ApplicationController
  skip_load_and_authorize_resource only: [:open_jobs, :show]
  load_and_authorize_resource
  before_action :set_company, except: %i[open_jobs]
  before_action :set_job, only: %i[show update destroy job_applicants]

  def index
    @jobs = @company.jobs
    @serialized_jobs = @jobs.map do |job|
      serialized_job = JobSerializer.new(job).serializable_hash[:data][:attributes]
      serialized_job[:company_id] = job.company.id # Add company_id to the attributes
      serialized_job
    end
    # serialized_jobs = @jobs.map { |job| JobSerializer.new(job).serializable_hash[:data][:attributes] }
    render json: { data: @serialized_jobs }
  end

  def show
    render json: {data: JobSerializer.new(@job).serializable_hash[:data][:attributes]}
  end

  def create
    @job = @company.jobs.build(job_params)

    @job.job_creator_id = current_user.id

    if @job.save
      render json: {
        status: { code: 201, message: 'Job Created Successfully.' },
        data: JobSerializer.new(@job).serializable_hash[:data][:attributes]
      }, status: :created
    else
      render json: { errors: @job.errors }, status: :unprocessable_entity
    end
  end

  def update
    if @job.update(job_params)
      render json: {
        status: { code: 200, message: 'Job Updated Successfully.' },
        data: JobSerializer.new(@job).serializable_hash[:data][:attributes]
      }, status: :ok
    else
      render json: { errors: @job.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    if @job.destroy
      render json: {
        status: { code: 200, message: 'Job Deleted Successfully.' }
      }, status: :ok
    else
      render json: { errors: @job.errors }, status: :unprocessable_entity
    end
  end

  def open_jobs
    authorize! :read, Job, status: 'open' # Manually authorize the action
    
    @open_jobs = Job.where(status: 'open')
    @serialized_open_jobs = @open_jobs.map do |open_job|
      serialized_job = JobSerializer.new(open_job).serializable_hash[:data][:attributes]
      serialized_job[:company_id] = open_job.company.id # Add company_id to the attributes
      serialized_job
    end
    render json: { data: @serialized_open_jobs }
  end

  def job_applicants
    @job_applications = @job.job_applications
    @serialized_job_applications = @job_applications.map { |job_application| JobApplicationSerializer.new(job_application).serializable_hash[:data][:attributes] }
    render json: { data: @serialized_job_applications }
  end

  private

  def set_company
    @company = Company.find(params[:company_id])
  end

  def set_job
    @job = @company.jobs.find(params[:id])
  end

  def job_params
    params.require(:job).permit(:title, :location, :salary, :requirments, :openings, :status)
  end
end
