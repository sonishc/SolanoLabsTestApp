# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Session, type: :model do
  subject do
    described_class.new(
      created_at: '2018-09-10 05:38:55 UTC',
      summary_status: 'failed', duration: 605
    )
  end

  it 'is valid with valid attributes' do
    expect(subject).to be_valid
  end

  it 'is not valid without a created_at' do
    subject.created_at = nil
    expect(subject).to_not be_valid
  end
end
