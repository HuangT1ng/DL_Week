"use client";
import { useState, useEffect, useRef } from 'react';

// Define types for our fact-check data
interface TextContent {
  text: string;
  reason: string;
  authenticity: string;
}

interface ImageContent {
  source: string;
  alt_text: string;
  reason: string;
  authenticity: string;
}

interface FactCheckData {
  text_content: TextContent[];
  images: ImageContent[];
}

interface PopupInfo {
  x: number;
  y: number;
  title: string;
  description: string;
}

export default function Highlighted() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);

  const factCheckData: FactCheckData = {
    "text_content": [
      {
        "text": "Eric Trump and Donald Trump Jr. were reportedly panicking Thursday after getting their tongues stuck to a frozen column near the West Wing of the White House.",
        "reason": "This is satirical content with no factual basis. It originates from a satirical source and should not be interpreted as real news.",
        "authenticity": "Likely False"
      },
      {
        "text": "We're going to thtarve to death!",
        "reason": "This is an exaggerated and fabricated speech, likely intended for humor or satire rather than factual reporting.",
        "authenticity": "Exaggerated"
      }
    ],
    "images": [
      {
        "source": "/images/trump-boys.jpg",
        "alt_text": "Trump Boys at White House",
        "reason": "This is a digitally manipulated satirical image. It has been altered to fit a humorous or fictional narrative.",
        "authenticity": "Digitally Manipulated "
      },
      {
        "source": "/images/eric-adams.jpg",
        "alt_text": "Political Profile: Eric Adams",
        "reason": "This is a mismatched image. The image displayed is kevin hart.",
        "authenticity": "Mismatched Image"
      }
    ]
  };

  // Function to handle click on highlighted text or image
  const handleHighlightClick = (e: React.MouseEvent, item: TextContent | ImageContent) => {
    e.preventDefault();
    e.stopPropagation();

    // Log to confirm position and item data
    console.log("handleHighlightClick triggered");
    console.log("Clicked at position:", e.clientX, e.clientY);
    console.log("Item data:", item);

    // Set popup info and position
    setPopupInfo({
      x: e.clientX,
      y: e.clientY,
      title: item.authenticity,
      description: item.reason
    });

    setShowPopup(true);

    // Log to verify if state is being updated
    console.log("Popup state updated:", { x: e.clientX, y: e.clientY, title: item.authenticity, description: item.reason });
  };



  // Function to close popup when clicking outside
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.fact-check-popup') && !target.classList.contains('highlight')) {
      setShowPopup(false);
    }
  };

  // Add event listener for clicking outside popup
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Function to find and highlight text in the article
  const highlightText = (content: string) => {
    let result = content;

    factCheckData.text_content.forEach((item) => {
      // Escape special characters in the text for use in regex
      const escapedText = item.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      // Create a regex to find the text
      const regex = new RegExp(`(${escapedText})`, 'g');

      // Replace the text with a highlighted span
      result = result.replace(regex, `<span class="highlight bg-yellow-200 cursor-pointer" data-authenticity="${item.authenticity}" data-reason="${item.reason}">$1</span>`);
    });

    return result;
  };

  // Reattach event listeners to highlighted elements after rendering
  useEffect(() => {
    const highlightedElements = document.querySelectorAll('.highlight');

    // Remove any previous event listeners and re-attach them
    highlightedElements.forEach((element) => {
      const handleClick = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const target = e.currentTarget as HTMLElement;
        const authenticity = target.getAttribute('data-authenticity') || '';
        const reason = target.getAttribute('data-reason') || '';

        setPopupInfo({
          x: mouseEvent.clientX,
          y: mouseEvent.clientY,
          title: authenticity,
          description: reason
        });

        setShowPopup(true);
        e.stopPropagation();
      };

      element.addEventListener('click', handleClick);

      // Cleanup the event listener on unmount or re-render
      return () => {
        element.removeEventListener('click', handleClick);
      };
    });

  }, [factCheckData.text_content, factCheckData.images]); // Add factCheckData.images to the dependency array

  return (
    <div className="min-h-screen bg-white relative">
      {/* CSS for highlighting and popup */}
      <style jsx global>{`
        .highlight {
          background-color: #FFEB3B;
          transition: background-color 0.2s ease;
          cursor: pointer;
        }
        
        .highlight-image {
          position: relative;
        }
        
        .highlight-image::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255, 235, 59, 0.3);
          pointer-events: none;
        }
        
        .fact-check-popup {
          position: fixed;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          padding: 12px;
          z-index: 1000;
          max-width: 320px;
          animation: fadeIn 0.2s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Popup for fact check information */}
      {showPopup && popupInfo && (
        <div 
          className="fact-check-popup"
          style={{
            top: `${popupInfo.y + 20}px`,
            left: `${Math.max(10, popupInfo.x - 160)}px`,
            zIndex: 9999
          }}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg">{popupInfo.title}</h3>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowPopup(false);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <p className="mb-3">{popupInfo.description}</p>
        </div>
      )}

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
      <main ref={contentRef} className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-8">
            <div className="text-gray-600 uppercase tracking-wide mb-2">Politics</div>
            <h1 className="text-5xl font-bold mb-6">
              Trump Boys Get Tongues Stuck To Frozen White House
            </h1>
            
            {/* Featured Image Section - Only Highlight Caption */}
            <div className="mb-6 z-0">
              <img 
                src="/images/trump-boys.jpg" 
                alt="Trump Boys at White House"
                className="w-full h-auto rounded-lg"
              />
              {factCheckData.images.some(img => img.source === "/images/trump-boys.jpg") ? (
                <p 
                  className="text-sm text-gray-500 mt-2 highlight cursor-pointer"
                  data-authenticity={factCheckData.images.find(img => img.source === "/images/trump-boys.jpg")?.authenticity}
                  data-reason={factCheckData.images.find(img => img.source === "/images/trump-boys.jpg")?.reason}
                  onClick={(e) => {
                    const imageData = factCheckData.images.find(img => img.source === "/images/trump-boys.jpg");
                    if (imageData) {
                      handleHighlightClick(e, imageData);
                    }
                  }}
                >
                  Eric Trump and Donald Trump Jr. stuck to a frozen White House column
                </p>
              ) : (
                <p className="text-sm text-gray-500 mt-2">
                  Eric Trump and Donald Trump Jr. stuck to a frozen White House column
                </p>
              )}
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

          {/* Article Content - using dangerouslySetInnerHTML to apply our highlights */}
          <article className="prose lg:prose-xl max-w-none mb-12">
            <p 
              className="text-xl leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: highlightText("WASHINGTON—Flailing their arms and crying out in anguish, Eric Trump and Donald Trump Jr. were reportedly panicking Thursday after getting their tongues stuck to a frozen column near the West Wing of the White House.")
              }}
            />
            <p className="text-xl leading-relaxed">
              "Oh my God, it's thtuck, it's thtuck!" said Don Jr., the eldest Trump boy,
              who blamed his brother Eric for the dare gone wrong, shouting, "Thith ith
              all your fault!" and attempting to kick him in the shins from the awkward
              angle at which he was fastened to the icy building.
            </p>
            <p 
              className="text-xl leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: highlightText('"We\'re going to die out here! We\'re going to thtarve to death! Are you happy, Eric? You wanted to know what the White Houthe tathted like, and now you know! Whereth Thecret Thervice?! Whereth FEMA?!"')
              }}
            />
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
              {factCheckData.images.some(img => img.source === "/images/eric-adams.jpg") ? (
                <h4 
                  className="font-bold mb-2 highlight cursor-pointer"
                  data-authenticity={factCheckData.images.find(img => img.source === "/images/eric-adams.jpg")?.authenticity}
                  data-reason={factCheckData.images.find(img => img.source === "/images/eric-adams.jpg")?.reason}
                  onClick={(e) => {
                    const imageData = factCheckData.images.find(img => img.source === "/images/eric-adams.jpg");
                    if (imageData) {
                      handleHighlightClick(e, imageData);
                    }
                  }}
                >
                  Political Profile: Eric Adams
                </h4>
              ) : (
                <h4 className="font-bold mb-2">
                  Political Profile: Eric Adams
                </h4>
              )}
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
