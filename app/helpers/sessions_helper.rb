# frozen_string_literal: true

# SessionsHelper
module SessionsHelper
  def sessions_json(sessions, created_at)
    created_at.nil? ? sessions.to_json : sessions.session_json(created_at)
  end

  def hidden?(instance)
    instance.empty?
  end
end
