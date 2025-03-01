"use client";

export default function OnionArticle() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex space-x-8">
              <a href="#" className="text-gray-700">News</a>
              <a href="#" className="text-gray-700">Local</a>
              <a href="#" className="text-gray-700">Politics</a>
              <a href="#" className="text-gray-700">Entertainment</a>
              <a href="#" className="text-gray-700">Sports</a>
              <a href="#" className="text-gray-700">Opinion</a>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Friday, February 28, 2025</span>
              <div className="flex items-center">
                <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
                <span className="ml-2">21°</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Header with Logo */}
      <header className="border-b py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-5xl font-serif italic">The Onion</h1>
            <div className="text-sm text-gray-600 italic">America's Finest News Source</div>
            <button className="bg-red-600 text-white px-6 py-2 rounded-md">
              Become A Member
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-8">
            <div className="text-gray-600 uppercase tracking-wide mb-2">Politics</div>
            <h1 className="text-5xl font-bold mb-6">
              Trump Boys Get Tongues Stuck To Frozen White House
            </h1>
            
            {/* Add Featured Image */}
            <div className="mb-6">
              <img 
                src="/images/trump-boys.jpg" 
                alt="Trump Boys at White House"
                className="w-full h-auto rounded-lg"
              />
              <p className="text-sm text-gray-500 mt-2">
                Eric Trump and Donald Trump Jr. stuck to a frozen White House column
              </p>
            </div>

            <div className="flex items-center space-x-4 mb-8">
              <span className="text-gray-600">Published: February 20, 2025</span>
              <div className="flex space-x-2">
                <button className="p-2 bg-gray-100 rounded-full">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button className="p-2 bg-gray-100 rounded-full">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <article className="prose lg:prose-xl max-w-none mb-12">
            <p className="text-xl leading-relaxed">
              WASHINGTON—Flailing their arms and crying out in anguish, Eric Trump
              and Donald Trump Jr. were reportedly panicking Thursday after getting
              their tongues stuck to a frozen column near the West Wing of the White House.
            </p>
            <p className="text-xl leading-relaxed">
              "Oh my God, it's thtuck, it's thtuck!" said Don Jr., the eldest Trump boy,
              who blamed his brother Eric for the dare gone wrong, shouting, "Thith ith
              all your fault!" and attempting to kick him in the shins from the awkward
              angle at which he was fastened to the icy building.
            </p>
            <p className="text-xl leading-relaxed">
              "We're going to die out here! We're going to thtarve to death! Are you
              happy, Eric? You wanted to know what the White Houthe tathted like, and
              now you know! Whereth Thecret Thervice?! Whereth FEMA?!"
            </p>
            <p className="text-xl leading-relaxed">
              At press time, the Trump boys were both seen frantically slapping their
              tongues with their hands.
            </p>
          </article>

          {/* Newsletter Signup */}
          <div className="bg-gray-100 p-8 rounded-lg mb-12">
            <h3 className="text-2xl font-bold mb-4">
              Like A Vitamin You Ingest With Your Eyes. Get The Onion Newsletter
            </h3>
            <form className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 p-3 border rounded"
              />
              <button className="bg-red-600 text-white px-6 py-3 rounded">
                Subscribe
              </button>
            </form>
          </div>

          {/* Related Articles with Images */}
          <div className="grid grid-cols-3 gap-8 mt-12">
            <div className="border-t pt-4">
              <img 
                src="/images/rfk-jr.jpg" 
                alt="RFK Jr."
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="font-bold mb-2">
                RFK Jr. Vows To Make Measles Deaths So Common They Won't Be Upsetting Anymore
              </h4>
            </div>
            <div className="border-t pt-4">
              <img 
                src="/images/democratic-leaders.jpg" 
                alt="Democratic Leaders"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="font-bold mb-2">
                Democratic Leaders Stand Real Still In Hopes No One Notices Them
              </h4>
            </div>
            <div className="border-t pt-4">
              <img 
                src="/images/eric-adams.jpg" 
                alt="Eric Adams"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="font-bold mb-2">
                Political Profile: Eric Adams
              </h4>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className="font-bold mb-4">Sections</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">The Latest</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">News</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Local</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Politics</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Explore</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Store</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Jobs</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <div className="flex justify-between items-center">
              <div className="text-gray-400">© 2025 The Onion</div>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white">Terms of Use</a>
                <a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 