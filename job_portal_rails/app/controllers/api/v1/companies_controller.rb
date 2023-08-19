class Api::V1::CompaniesController < ApplicationController
  load_and_authorize_resource
  before_action :set_company, only: %i[show update destroy]

  def index
    @companies = current_user.companies.all
    serialized_companies = @companies.map { |company| CompanySerializer.new(company).serializable_hash[:data][:attributes] }
    render json: { data: serialized_companies }
  end

  def show
    render json: {data: CompanySerializer.new(@company).serializable_hash[:data][:attributes]}
  end

  def create
    @company = current_user.companies.build(company_params)

    if @company.save
      render json: {
        status: { code: 201, message: 'Company Created Successfully.' },
        data: CompanySerializer.new(@company).serializable_hash[:data][:attributes]
      }, status: :created
    else
      render json: { errors: @company.errors }, status: :unprocessable_entity
    end
  end

  def update
    if @company.update(company_params)
      render json: {
        status: { code: 200, message: 'Company Updated Successfully.' },
        data: CompanySerializer.new(@company).serializable_hash[:data][:attributes]
      }, status: :ok
    else
      render json: { errors: @company.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    if @company.destroy
      render json: {
        status: { code: 200, message: 'Company Deleted Successfully.' }
      }, status: :ok
    else
      render json: { errors: @company.errors }, status: :unprocessable_entity
    end
  end

  private

  def set_company
    @company = current_user.companies.find(params[:id])
  end

  def company_params
    params.require(:company).permit(:name, :description, :address, :email, :phone_number)
  end
end
