# frozen_string_literal: true

class Session < ApplicationRecord
  validates_presence_of :created_at

  require 'csv'

  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      session_hash = row.to_hash
      session = Session.where(id: session_hash['id'])

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
    created_at_uniq.uniq!
  end
end
