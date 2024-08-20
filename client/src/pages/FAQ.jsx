import React from "react";

const FAQ = () => {
  return (
    <div className="text-gray-800 dark:text-white">
      <div className=" mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-6">FAQ</h2>
        <h3 className="text-xl  mb-2">
          Listen & Vote Frequently Asked Questions (FAQ)
        </h3>
        <div className="space-y-6">
          <div>
            <p className="text-md">
              The 'Listen and Vote' platform is a unique online space where fans
              of Russ can listen to snippets of unreleased songs and vote for
              their favorite. The song with the most votes will be officially
              released by Russ.
            </p>
          </div>

          <div>
            <h3 className="text-md  mb-1">
              How long is each snippet?
            </h3>
            <p className="text-md">
              Each song snippet is usually about 15 seconds long, giving you a
              taste of the track to help inform your vote.
            </p>
          </div>

          <div>
            <h3 className="text-md  mb-1">
              How do I fix playback issues with the song snippets?
            </h3>
            <p className="text-md">
              If the snippets are not playing smoothly, try refreshing the page,
              clearing your browser cache, or switching to a different browser.
              Ensure you have a stable internet connection for optimal streaming
              quality.
            </p>
          </div>
          {/* acciden */}
          <div>
            <h3 className="text-md  mb-1">
              I voted accidentally. Can I change my vote?
            </h3>
            <p className="text-md">
              Once a vote is cast, it cannot be changed. We encourage you to
              listen to all snippets carefully before making your decision.
            </p>
          </div>
          <div>
            <h3 className="text-md  mb-1">
              How do I know if my vote was successfully submitted?
            </h3>
            <p className="text-md">
              After voting, you should receive a confirmation message on the
              screen and in your email.
            </p>
          </div>
          {/* period end */}
          <div>
            <h3 className="text-md  mb-1">
              When will the voting period end?
            </h3>
            <p className="text-md">
              The voting period is typically short, lasting anywhere from a few
              days to a week. Check the platform or official announcements from
              Russ for specific end dates and times.
            </p>
          </div>
          <div>
            <h3 className="text-md  mb-1">
              How will the winning song be released?
            </h3>
            <p className="text-md">
              Once the voting closes, Russ will announce the results and more
              information on the upcoming release of the song. Once the song is
              released it will then be available on various music streaming
              platforms.
            </p>
          </div>
          <div>
            <h3 className="text-md  mb-1">
              I’m experiencing issues with the mobile version of the platform.
              What can I do?
            </h3>
            <p className="text-md">
              Ensure that your mobile device’s operating system and browser are
              up to date. If problems persist, try accessing the platform on a
              desktop computer or contact the support team for mobile-specific
              assistance contact info@russworld.com.
            </p>
          </div>
          <div>
            <h3 className="text-md  mb-1">
              My question is not listed here. How can I get help?
            </h3>
            <p className="text-md">
              For any other issues or questions, reach out to the support team
              directly through info@russworld.com. Provide a detailed
              description of your problem to receive the most effective
              assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
