class Api::V1::ReviewsController < ApplicationController
  load_and_authorize_resource
  before_action :set_company

  def index
    @reviews = @company.reviews
    @serialized_reviews = @reviews.map { |review| ReviewSerializer.new(review).serializable_hash[:data][:attributes] }
    render json: { data: @serialized_reviews }
  end
      
  def create
    @review = @company.reviews.build(review_params)
    @review.job_seeker_id = current_user.id

    if @review.save
      render json: {
        status: { code: 201, message: 'Review created successfully.' }
      }, status: :created
    else
      render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_company
    @company = Company.find(params[:company_id])
  end

  def review_params
    params.require(:review).permit(:review_text, :rating)
  end
end
