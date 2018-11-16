# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'sessions/index' do
  it 'has a request.fullpath that is defined' do
    expect(controller.request.fullpath).to eq sessions_path
  end
end
