class GridWidgetsController < ApplicationController
    before_action :set_grid, only: [:show, :update, :destroy]

  # GET /grids
  def index
    @grid_widgets = Grid.all

    render json: @grid_widgets
  end

  # GET /grids/1
  def show
    render json: @grid_widget
  end

  # POST /grids
  def create
    @grid_widget = Grid.new(grid_params)

    if @grid_widget.save
      render json: @grid_widget, status: :created, location: @grid_widget
    else
      render json: @grid_widget.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /grids/1
  def update
    if @grid_widget.update(grid_params)
      render json: @grid_widget
    else
      render json: @grid_widget.errors, status: :unprocessable_entity
    end
  end

  # DELETE /grids/1
  def destroy
    @grid_widget.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_grid_widget
      @grid_widget = Grid.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def grid_widget_params
      params.require(:grid).permit(:name, :title, :col, :size)
    end
end