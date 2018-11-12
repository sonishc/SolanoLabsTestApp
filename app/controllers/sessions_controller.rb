# frozen_string_literal: true

class SessionsController < ApplicationController
  def index
    @sessions = Session.all
    if params[:session].nil?
      @created_at = ''
      @sessions_json = @sessions.to_json
    else
      @created_at = params[:session][:sessions_created_at]
      if @created_at == 'ALL DAYS' then redirect_to root_path end
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
