const About = () => {
  return (
    <div>
      <div className="my-4 text-2xl">About</div>
      <div className="my-4">
        Vouched is a platform that allows you to endorse people you know and
        trust.{" "}
      </div>

      <div className="my-4">
        <div className="text-xl font-bold">How it works</div>
        <div className="my-4">
          <div className="text-lg font-bold">Endorsements</div>
          <div>
            Endorsements are a way to vouch for someone you know. When you
            endorse someone, you are saying that you trust them. You can endorse
            someone for a specific skill, or for their character.
          </div>
        </div>

        <div className="my-4">
          <div className="text-lg font-bold">Profile page</div>
          <div>
            A profile page is defined by a unique handle you can define from the
            Manage tab. You can share your profile page with others, and they
            can vouch for you. When someone vouches for you, they are saying
            that they trust you. You can also vouch for others.
          </div>
        </div>

        <div className="my-4">
          <div className="text-lg font-bold">Privacy</div>
          <div>
            In order to vouch for someone, you must be logged in and your
            account must also be active. Your name and profile picture will be
            shown on their vouched page once the endorsement is approved by that
            user.
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
