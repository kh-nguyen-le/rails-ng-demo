Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  
  resources :widgets
  resources :grids
  resources :layouts
  resources :layout_grids
  resources :grid_widgets
  get '/health', to: 'health#index'
  root to: 'health#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
