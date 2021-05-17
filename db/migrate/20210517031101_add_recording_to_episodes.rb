class AddRecordingToEpisodes < ActiveRecord::Migration[6.1]
  def change
    add_column :episodes, :recording, :string
  end
end
