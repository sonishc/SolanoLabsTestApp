# frozen_string_literal: true

class SessionsController < ApplicationController
  def index
    @sessions = Session.all
    @created_at = params[:session].nil? ? '' : params[:session][:sessions_created_at].first(10)
    @created_at_values = Session.where('created_at LIKE ?', "%#{@created_at}%")
    @sessions_json = @created_at_values.to_json
    @created_at_uniq = Session.created_at_uniq_values || []
  end

  def import
    Session.import(params[:file])
    redirect_to root_url
  end

  def destroy
    Session.delete_all
    redirect_to root_url
  end
end
