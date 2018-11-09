# frozen_string_literal: true

Rails.application.routes.draw do
  resources :sessions do
    collection { post :import }
  end

  delete 'sessions', action: :destroy, controller: 'sessions'

  root to: 'sessions#index'
end
