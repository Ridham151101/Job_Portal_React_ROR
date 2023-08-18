class Api::V1::PortfoliosController < ApplicationController
  before_action :set_portfolio, only: %i[show update]

  def index
    @portfolios = current_user.portfolios
    render json: @portfolios, each_serializer: PortfolioSerializer
  end

  def show
    render json: {data: PortfolioSerializer.new(@portfolio).serializable_hash[:data][:attributes]}
  end

  def create
    @portfolio = current_user.portfolios.build(portfolio_params)

    if @portfolio.save
      render json: {
        status: { code: 201, message: 'Portfolio Created Successfully.' },
        data: PortfolioSerializer.new(@portfolio).serializable_hash[:data][:attributes]
      }, status: :created
    else
      render json: { errors: @portfolio.errors }, status: :unprocessable_entity
    end
  end

  def update
    if @portfolio.update(portfolio_params)
      render json: {
        status: { code: 200, message: 'Portfolio Updated Successfully.' },
        data: PortfolioSerializer.new(@portfolio).serializable_hash[:data][:attributes]
      }, status: :ok
    else
      render json: { errors: @portfolio.errors }, status: :unprocessable_entity
    end
  end

  private

  def set_portfolio
    @portfolio = current_user.portfolios.find(params[:id])
  end

  def portfolio_params
    params.require(:portfolio).permit(
      :title,
      :about_user,
      :skills,
      :education,
      :experience,
      :linkdin_url
    )
  end
end
