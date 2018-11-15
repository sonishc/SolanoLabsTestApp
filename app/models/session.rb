# frozen_string_literal: true

# Session
class Session < ApplicationRecord
  validates_presence_of :created_at, :duration, :summary_status

  require 'csv'

  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      session_hash = row.to_hash
      session = Session.where(session_id: session_hash['session_id'])
      if session.count == 1
        session.first.update_attributes(session_hash)
      else
        Session.create!(session_hash)
      end
    end
  end

  def self.created_at_uniq_values
    created_at_uniq = []
    Session.all.each do |item|
      created_at_uniq << item.created_at.to_date.to_s
    end
    created_at_uniq.unshift 'ALL DAYS'
    created_at_uniq.uniq!
  end

  def self.sessions_json(param)
    created_at_values = Session.all.select do |x|
      x.created_at.to_s.first(10) == param.first(10)
    end
    created_at_values.to_json
  end
end
