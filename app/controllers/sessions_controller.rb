# frozen_string_literal: true

# SessionsController
class SessionsController < ApplicationController
  def index
    @sessions = Session.order(:created_at)
    if params[:session].nil?
      @created_at = ''
      @sessions_json = @sessions.to_json
    else
      @created_at = params[:session][:sessions_created_at]
      redirect_to root_path if @created_at == 'ALL DAYS'
      @sessions_json = Session.sessions_json(@created_at)
    end
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
