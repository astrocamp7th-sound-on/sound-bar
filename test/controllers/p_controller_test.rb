require "test_helper"

class PControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get p_index_url
    assert_response :success
  end

  test "should get show" do
    get p_show_url
    assert_response :success
  end
end
