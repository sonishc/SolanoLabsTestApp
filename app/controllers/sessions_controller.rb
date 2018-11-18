# frozen_string_literal: true

# SessionsController
class SessionsController < ApplicationController
  def index
    @sessions = Session.order(:created_at)
    @created_at_uniq = @sessions.created_at_uniq_values
    created_at = params[:session][:session_created_at] unless params[:session].nil?
    @sessions_json = helpers.sessions_json(@sessions, created_at)
    redirect_to root_path if created_at == 'ALL DAYS'
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
