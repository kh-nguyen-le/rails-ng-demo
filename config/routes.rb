Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  
  resources :widgets
  resources :grids
  resources :layouts
  resources :layout_grids
  resources :grid_widgets
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
