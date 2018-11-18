# frozen_string_literal: true

# Session
class Session < ApplicationRecord
  validates_presence_of :created_at, :duration, :summary_status

  require 'csv'

  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      session_hash = row.to_hash
      id = session_hash['session_id']
      break if id.nil?

      Session.create_with(session_hash).find_or_create_by(session_id: id)
    end
  end

  def self.created_at_uniq_values
    created_at_uniq = Session.all.map do |row|
      row.created_at.to_date
    end
    created_at_uniq.unshift 'ALL DAYS'
    created_at_uniq.uniq
  end

  def self.session_json(param)
    return if param.casecmp('ALL DAYS').zero?

    created_at_values = Session.all.select do |row|
      row.created_at.to_date == param.to_date
    end
    created_at_values.to_json
  end
end
