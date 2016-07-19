class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :post
  def as_json(options = {})
    super(options.merge(include: :user))
  end
end
