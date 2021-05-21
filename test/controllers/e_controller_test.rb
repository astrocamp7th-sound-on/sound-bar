require "test_helper"

class EControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get e_show_url
    assert_response :success
  end
end
