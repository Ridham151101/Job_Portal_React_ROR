class Api::V1::JobsController < ApplicationController
  load_and_authorize_resource
  before_action :set_company
  before_action :set_job, only: %i[show update destroy]

  def index
    @jobs = @company.jobs
    serialized_jobs = @jobs.map { |job| JobSerializer.new(job).serializable_hash[:data][:attributes] }
    render json: { data: serialized_jobs }
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

  def open
    @job.update(status: "open")
    render json: {
      status: { code: 200, message: 'Job Opened Successfully.' },
      data: @job.status
    }, status: :ok
  end

  def close
    @job.update(status: "closed")
    render json: {
      status: { code: 200, message: 'Job Closed Successfully.' },
      data: { status: @job.status }
    }, status: :ok
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
