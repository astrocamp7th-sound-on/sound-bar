class RemoveAudioFromEpisodes < ActiveRecord::Migration[6.1]
  def change
    remove_column :episodes, :audio, :string
  end
end
