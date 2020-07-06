workflow "Publish package" {
  on = "release"
  resolves = ["publish"]
}

action "publish" {
  uses = "actions/npm@master"
  args = "publish",
  secrets= ["NPM_AUTH_TOKEN"]
}