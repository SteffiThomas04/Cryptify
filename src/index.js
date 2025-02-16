import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { FaCopy } from "react-icons/fa"; // Import copy icon

gsap.registerPlugin(TextPlugin);

// Loader Component
const Loader = () => {
  const loaderRef = useRef(null);

  useEffect(() => {
    const loader = loaderRef.current;
    gsap.to(loader, {
      opacity: 0,
      delay: 2,
      onComplete: () => {
        loader.style.display = "none";
      },
    });
  }, []);

  return (
    <div
      ref={loaderRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <motion.div
        style={{ fontSize: "3rem", color: "white" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        🔒
      </motion.div>
      <motion.div
        style={{ fontSize: "2rem", color: "white", marginLeft: "1rem" }}
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        🔑
      </motion.div>
    </div>
  );
};

// Scramble Text Animation Component
const ScrambleText = ({ text, duration = 1, delay = 0 }) => {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.to(textRef.current, {
      duration: duration,
      delay: delay,
      text: {
        value: text,
        scrambleText: {
          chars: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
          revealDelay: 0.5,
          speed: 0.3,
        },
      },
      ease: "power2.out",
    });
  }, [text, duration, delay]);

  return <span ref={textRef}></span>;
};

// Inline CSS
const styles = {
  body: { margin: "0", fontFamily: "Roboto, sans-serif", textAlign: "center", color: "white", position: "relative", overflow: "hidden" },
  videoContainer: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1, overflow: "hidden" },
  videoBackground: { width: "100%", height: "100%", objectFit: "cover" },
  overlay: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.3)" },
  navbar: { 
    display: "flex", 
    justifyContent: "space-between", 
    padding: "1rem", 
    width: "100%", 
    boxSizing: "border-box", 
    position: "fixed", 
    top: 0, 
    left: 0, 
    zIndex: 2, 
    backdropFilter: "blur(8px)" 
  },
  navbarUl: { listStyle: "none", display: "flex", gap: "20px", margin: "0", padding: "0", justifyContent: "center" },
  link: { color: "white", textDecoration: "none", fontWeight: "bold" },
  section: { padding: "4rem", maxWidth: "1200px", margin: "5rem auto 0 auto", position: "relative", zIndex: 1, backgroundColor: "rgba(0, 0, 0, 0.6)", borderRadius: "10px", backdropFilter: "blur(5px)", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)" },
  scrollContainer: { display: "flex", gap: "30px", padding: "1rem", justifyContent: "flex-start", alignItems: "center", minWidth: "100%" },
  card: { background: "rgba(46, 58, 71, 0.7)", padding: "1.5rem", borderRadius: "10px", minWidth: "250px", boxShadow: "2px 2px 15px rgba(0,0,0,0.3)", color: "white", backdropFilter: "blur(5px)" },
  firstCard: { marginLeft: "20px" },
  image: { width: "100%", height: "150px", objectFit: "cover", borderRadius: "10px", marginBottom: "10px" },
  footer: { padding: "1rem", textAlign: "center", position: "relative", zIndex: 1, backdropFilter: "blur(5px)" },
  welcomeText: { fontSize: "3rem", fontWeight: "bold", margin: "1rem 0", color: "#68A0B4" },
  welcomeSubText: { fontSize: "1.5rem", color: "#B0C7D8" },
  cardHeading: { fontSize: "1.5rem", marginBottom: "10px", color: "#5BFF91" },
  input: { padding: "0.5rem", margin: "0.5rem 0", borderRadius: "5px", border: "1px solid #ccc", width: "100%", maxWidth: "300px", color: "black" },
  button: { padding: "0.5rem 1rem", margin: "0.5rem 0", borderRadius: "5px", border: "none", backgroundColor: "#68A0B4", color: "white", cursor: "pointer" },
  contentBox: { backgroundColor: "rgba(255, 255, 255, 0.1)", padding: "1rem", borderRadius: "10px", margin: "1rem 0", color: "white" },
  errorMsg: { color: "red", margin: "1rem 0" },
  successMsg: { color: "green", margin: "1rem 0" },
  copyIcon: { marginLeft: "10px", cursor: "pointer" },
  helpBlock: { backgroundColor: "rgba(255, 255, 255, 0.1)", padding: "1rem", borderRadius: "10px", margin: "1rem 0", textAlign: "left" },
  helpHeading: { fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", color: "#5BFF91" } // Green color for help page headings
};

// Background Video Component
const VideoBackground = () => (
  <div style={styles.videoContainer}>
    <video style={styles.videoBackground} autoPlay loop muted>
      <source src="/video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div style={styles.overlay}></div>
  </div>
);

// Components
const Navbar = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav style={styles.navbar}>
      <h1 style={{ margin: "0" }}>Cryptify</h1>
      <ul style={styles.navbarUl}>
        <li><Link to="/" onClick={() => scrollToSection("home")} style={styles.link}>Home</Link></li>
        <li><Link to="/encrypt" style={styles.link}>Encrypt</Link></li>
        <li><Link to="/decrypt" style={styles.link}>Decrypt</Link></li>
        <li><Link to="/" onClick={() => scrollToSection("about-us")} style={styles.link}>About Us</Link></li>
        <li><Link to="/help" style={styles.link}>Help</Link></li>
      </ul>
    </nav>
  );
};

const Welcome = () => (
  <section style={styles.section} id="home">
    <motion.h2 style={styles.welcomeText} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
      <ScrambleText text="Welcome to Cryptify" duration={2} delay={0.5} />
    </motion.h2>
    <motion.p style={styles.welcomeSubText} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }}>
      Your go-to solution for secure encryption and decryption.
    </motion.p>
  </section>
);

const Overview = () => {
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Image animation
    gsap.from(imageRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.5,
    });

    // Text animation
    gsap.from(textRef.current.children, {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      delay: 1.5,
    });

    // Parallax effect on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      gsap.to(imageRef.current, {
        scale: 1 + scrollY * 0.001,
        ease: "power2.out",
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section style={styles.section} id="overview">
      <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "2rem", color: "white" }}>
        <ScrambleText text="Overview" duration={1} delay={0.5} />
      </h2>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div ref={textRef} style={{ textAlign: "left", padding: "0 2rem", flex: 1 }}>
          <h3 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "1rem" }}>Cryptify: A Simple Way to Secure Your Data</h3>
          <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
            Modern digital living demands strong data protection measures more than ever before. Cryptify is a powerful yet easy-to-use encryption and decryption tool that uses cutting-edge cryptographic techniques to protect your important files and data.
          </p>
          <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}><strong>Advanced Encryption</strong> – Secure your data with industry-standard encryption, including AES, Blowfish, Twofish, and 3DES.</p>
          <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}><strong>Fast and Efficient</strong> – Experience effortless encryption that doesn't reduce performance speed.</p>
          <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}><strong>User-Friendly Interface</strong> – Anyone can encrypt and decrypt files using the user-friendly interface and simple three-click process.</p>
          <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}><strong>Versatile File Support</strong> – The tool supports the encryption of text, PDFs, photos, videos, presentations, and more.</p>
          <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}><strong>Custom Key & Security Options</strong> – For greater control, select either automatic key generation or user-defined encryption keys.</p>
          <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}><strong>Your Privacy, Our Priority</strong> – Strong encryption methods in Cryptify provide top-level data protection so your information remains inaccessible to intruders.</p>
          <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}><strong>Encrypt. Protect. Stay Safe. Try Cryptify Now! </strong></p>
        </div>
        <img
          ref={imageRef}
          src="/crypto.jpg"
          alt="Cryptify"
          style={{ width: "300px", height: "auto", borderRadius: "10px", marginLeft: "2rem" }}
        />
      </div>
    </section>
  );
};

const AboutUs = () => (
  <section style={styles.section} id="about-us">
    <h2>About Us</h2>
    <div style={{ textAlign: "left", padding: "0 2rem" }}>
      <h3 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "1rem" }}>About Cryptify</h3>
      <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
        Our encryption platform is powerful and easy to use, built on industry-leading algorithms such as AES, Blowfish, Twofish, and 3DES to secure your sensitive data.
      </p>
      <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}><strong>Our Mission</strong> – At Cryptify, we aim to make encryption easy, fast, and dependable to provide smooth protection of data for both personal and corporate use.</p>
      <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}><strong>What Makes Us Different?</strong> – We have a simple interface, fast processing, and the ability to give users a choice of encryption options, giving users control over their security.</p>
      <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}><strong>Meet the Team</strong> – We are students with a passion for cryptography, software development, and data security. At Cryptify, we are trying to help advance the world of encryption by creating security tools that are easy to use for the average person.</p>
      <ul style={{ textAlign: "left", listStyleType: "none", paddingLeft: "0" }}>
        <li>👨‍💻 Harigovind G</li>
        <li>👩‍💻 Steffi Thomas Puthuparambil</li>
        <li>🧑‍💻 Abhishek Pillai</li>
        <li>👨‍💻 Mohammed Ameen</li>
      </ul>
      <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}><strong>Keep Your Data Safe with Cryptify – Security Made Easy</strong></p>
    </div>
  </section>
);

const AlgorithmCard = ({ name, description, image, style }) => (
  <motion.div style={{ ...styles.card, ...style }} whileHover={{ scale: 1.1 }}>
    <img src={image} alt={name} style={styles.image} />
    <h3 style={styles.cardHeading}>{name}</h3>
    <p>{description}</p>
  </motion.div>
);

const Algorithms = () => (
  <section style={styles.section}>
    <h2>Encryption Techniques</h2>
    <motion.div
      style={styles.scrollContainer}
      drag="x"
      dragConstraints={{ left: -600, right: 0 }}
      whileTap={{ cursor: "grabbing" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <AlgorithmCard
        style={styles.firstCard}
        name="AES"
        description="Advanced Encryption Standard. AES is widely used for secure data encryption and is a symmetric key algorithm."
        image="/aes.jpg"
      />
      <AlgorithmCard
        name="3DES"
        description="Triple Data Encryption Standard. A more secure version of the older DES algorithm that applies the DES algorithm three times to each data block."
        image="/3des.png"
      />
      <AlgorithmCard
        name="Blowfish"
        description="Fast symmetric-key block cipher that was designed to be a fast and secure replacement for DES."
        image="/blowfish.png"
      />
      <AlgorithmCard
        name="Twofish"
        description="Successor to Blowfish, offering more advanced features and enhanced security for modern systems."
        image="/twofish.jpg"
      />
    </motion.div>
  </section>
);

const Footer = () => (
  <footer style={styles.footer}>
    <p>Always keep the data safe!</p>
  </footer>
);

const EncryptPage = () => {
  const [file, setFile] = useState(null);
  const [mode, setMode] = useState(null);
  const [algorithm, setAlgorithm] = useState("AES");
  const [blockSize, setBlockSize] = useState(128);
  const [keySize, setKeySize] = useState(128);
  const [iv, setIv] = useState("");
  const [text, setText] = useState("");
  const [encryptionStatus, setEncryptionStatus] = useState("");
  const [uploadType, setUploadType] = useState("text");
  const [encryptedContent, setEncryptedContent] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      if (
        fileType === "application/pdf" ||
        fileType === "application/vnd.ms-powerpoint" ||
        fileType === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
        fileType === "video/mp4" ||
        fileType === "image/jpeg"
      ) {
        setFile(file);
        setEncryptionStatus("File uploaded successfully!");
      } else {
        setEncryptionStatus("Error: Only PDF, PPT, MP4, and JPG files are supported.");
      }
    }
  };

  const handleEncrypt = () => {
    if ((uploadType === "text" && text.trim() === "") || (uploadType === "file" && !file)) {
      setEncryptionStatus("Error: Please provide text or upload a file.");
      return;
    }
    // Simulate encryption process
    setEncryptedContent("Encrypted Content: " + (uploadType === "text" ? text : file.name));
    setEncryptionStatus("Encryption successful!");
  };

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
    alert("Copied to clipboard: " + value);
  };

  const getKeySizeOptions = () => {
    switch (algorithm) {
      case "AES":
        return [128, 192, 256];
      case "3DES":
        return [112, 168];
      case "Blowfish":
        return Array.from({ length: 56 - 4 + 1 }, (_, i) => (i + 4) * 8); // 32 to 448 bits
      case "Twofish":
        return [128, 192, 256];
      default:
        return [];
    }
  };

  const getBlockSize = () => {
    switch (algorithm) {
      case "AES":
        return 128;
      case "3DES":
        return 64;
      case "Blowfish":
        return 64;
      case "Twofish":
        return 128;
      default:
        return 128;
    }
  };

  return (
    <div style={styles.body}>
      <VideoBackground />
      <Navbar />
      <section style={styles.section}>
        <h2>Encryption</h2>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h3>Upload Type</h3>
          <button onClick={() => setUploadType("text")} style={styles.button}>Text</button>
          <button onClick={() => setUploadType("file")} style={styles.button}>File</button>
        </motion.div>
        {uploadType === "text" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>
            <h3>Enter Text</h3>
            <input
              type="text"
              placeholder="Enter text to encrypt"
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={styles.input}
            />
          </motion.div>
        )}
        {uploadType === "file" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>
            <h3>Upload File </h3>
            <input
              type="file"
              onChange={handleFileChange}
              style={styles.input}
              title="Supports PDF, PPT, MP4, and JPG only"
            />
            {file && <p>{file.name} uploaded successfully!</p>}
          </motion.div>
        )}
        {uploadType && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}>
            <h3>Choose Mode</h3>
            <button onClick={() => setMode("simple")} style={styles.button}>Simple</button>
            <button onClick={() => setMode("advanced")} style={styles.button}>Advanced</button>
          </motion.div>
        )}
        {mode === "simple" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }}>
            <h3>Simple Encryption</h3>
            <p>Algorithm: AES</p>
            <p>Block Size: 128 bits</p>
            <p>Key Size: 128 bits</p>
            <button onClick={handleEncrypt} style={styles.button}>Encrypt</button>
          </motion.div>
        )}
        {mode === "advanced" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }}>
            <h3>Advanced Encryption</h3>
            <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} style={styles.input}>
              <option value="AES">AES</option>
              <option value="3DES">3DES</option>
              <option value="Blowfish">Blowfish</option>
              <option value="Twofish">Twofish</option>
            </select>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="number"
                placeholder="Block Size"
                value={getBlockSize()}
                style={styles.input}
                disabled
              />
              <FaCopy style={styles.copyIcon} onClick={() => handleCopy(getBlockSize())} />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <select
                value={keySize}
                onChange={(e) => setKeySize(e.target.value)}
                style={styles.input}
              >
                {getKeySizeOptions().map((size) => (
                  <option key={size} value={size}>
                    {size} bits
                  </option>
                ))}
              </select>
              <FaCopy style={styles.copyIcon} onClick={() => handleCopy(keySize)} />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="text"
                placeholder="Initialization Vector (IV)"
                value={iv}
                onChange={(e) => setIv(e.target.value)}
                style={styles.input}
              />
              <FaCopy style={styles.copyIcon} onClick={() => handleCopy(iv)} />
            </div>
            <button onClick={handleEncrypt} style={styles.button}>Encrypt</button>
          </motion.div>
        )}
        {encryptionStatus && (
          <p style={encryptionStatus.includes("Error") ? styles.errorMsg : styles.successMsg}>
            {encryptionStatus}
          </p>
        )}
        {encryptedContent && <div style={styles.contentBox}>{encryptedContent}</div>}
        <button style={styles.button}>Download Encrypted File</button>
      </section>
    </div>
  );
};

const DecryptPage = () => {
  const [file, setFile] = useState(null);
  const [algorithm, setAlgorithm] = useState("AES");
  const [blockSize, setBlockSize] = useState(128);
  const [keySize, setKeySize] = useState(128);
  const [iv, setIv] = useState("");
  const [text, setText] = useState("");
  const [decryptionStatus, setDecryptionStatus] = useState("");
  const [uploadType, setUploadType] = useState("text");
  const [decryptedContent, setDecryptedContent] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      if (
        fileType === "application/pdf" ||
        fileType === "application/vnd.ms-powerpoint" ||
        fileType === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
        fileType === "video/mp4" ||
        fileType === "image/jpeg"
      ) {
        setFile(file);
        setDecryptionStatus("File uploaded successfully!");
      } else {
        setDecryptionStatus("Error: Only PDF, PPT, MP4, and JPG files are supported.");
      }
    }
  };

  const handleDecrypt = () => {
    if ((uploadType === "text" && text.trim() === "") || (uploadType === "file" && !file)) {
      setDecryptionStatus("Error: Please provide text or upload a file.");
      return;
    }
    // Simulate decryption process
    setDecryptedContent("Decrypted Content: Sample Decrypted Text");
    setDecryptionStatus("Decryption successful!");
  };

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
    alert("Copied to clipboard: " + value);
  };

  const getKeySizeOptions = () => {
    switch (algorithm) {
      case "AES":
        return [128, 192, 256];
      case "3DES":
        return [112, 168];
      case "Blowfish":
        return Array.from({ length: 56 - 4 + 1 }, (_, i) => (i + 4) * 8); // 32 to 448 bits
      case "Twofish":
        return [128, 192, 256];
      default:
        return [];
    }
  };

  const getBlockSize = () => {
    switch (algorithm) {
      case "AES":
        return 128;
      case "3DES":
        return 64;
      case "Blowfish":
        return 64;
      case "Twofish":
        return 128;
      default:
        return 128;
    }
  };

  return (
    <div style={styles.body}>
      <VideoBackground />
      <Navbar />
      <section style={styles.section}>
        <h2>Decryption</h2>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h3>Upload Type</h3>
          <button onClick={() => setUploadType("text")} style={styles.button}>Text</button>
          <button onClick={() => setUploadType("file")} style={styles.button}>File</button>
        </motion.div>
        {uploadType === "text" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>
            <h3>Enter Text</h3>
            <input
              type="text"
              placeholder="Enter text to decrypt"
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={styles.input}
            />
          </motion.div>
        )}
        {uploadType === "file" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>
            <h3>Upload File (JPG, MP4, PDF)</h3>
            <input
              type="file"
              onChange={handleFileChange}
              style={styles.input}
              title="Supports PDF, PPT, MP4, and JPG only"
            />
            {file && <p>{file.name} uploaded successfully!</p>}
          </motion.div>
        )}
        {uploadType && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}>
            <h3>Choose Algorithm</h3>
            <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} style={styles.input}>
              <option value="AES">AES</option>
              <option value="3DES">3DES</option>
              <option value="Blowfish">Blowfish</option>
              <option value="Twofish">Twofish</option>
            </select>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="number"
                placeholder="Block Size"
                value={getBlockSize()}
                style={styles.input}
                disabled
              />
              <FaCopy style={styles.copyIcon} onClick={() => handleCopy(getBlockSize())} />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <select
                value={keySize}
                onChange={(e) => setKeySize(e.target.value)}
                style={styles.input}
              >
                {getKeySizeOptions().map((size) => (
                  <option key={size} value={size}>
                    {size} bits
                  </option>
                ))}
              </select>
              <FaCopy style={styles.copyIcon} onClick={() => handleCopy(keySize)} />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="text"
                placeholder="Initialization Vector (IV)"
                value={iv}
                onChange={(e) => setIv(e.target.value)}
                style={styles.input}
              />
              <FaCopy style={styles.copyIcon} onClick={() => handleCopy(iv)} />
            </div>
            <button onClick={handleDecrypt} style={styles.button}>Decrypt</button>
          </motion.div>
        )}
        {decryptionStatus && (
          <p style={decryptionStatus.includes("Error") ? styles.errorMsg : styles.successMsg}>
            {decryptionStatus}
          </p>
        )}
        {decryptedContent && <div style={styles.contentBox}>{decryptedContent}</div>}
        <button style={styles.button}>Download Decrypted File</button>
      </section>
    </div>
  );
};

const HelpPage = () => (
  <div style={styles.body}>
    <VideoBackground />
    <Navbar />
    <section style={styles.section}>
      <h2>Help & Support – Cryptify</h2>
      <div style={styles.helpBlock}>
        <h3 style={styles.helpHeading}>Welcome to Cryptify’s Help Center!</h3>
        <p>This guide will help you understand how to use our encryption platform, the key concepts behind encryption, and answer common questions.</p>
      </div>
      <div style={styles.helpBlock}>
        <h3 style={styles.helpHeading}>Getting Started</h3>
        <p><strong>What is Cryptify?</strong></p>
        <p>Cryptify is an easy-to-use encryption and decryption tool designed to secure your files and data using AES, Blowfish, Twofish, and 3DES.</p>
        <p>It allows users to protect text, documents, images, videos, and more with advanced encryption techniques.</p>
        <p><strong>How Does It Work?</strong></p>
        <p>1️⃣ Choose an encryption algorithm (AES, Blowfish, Twofish, or 3DES).</p>
        <p>2️⃣ Upload your file or enter text for encryption.</p>
        <p>3️⃣ Generate a random key or use your own custom key for security.</p>
        <p>4️⃣ Encrypt your data and download the secure file.</p>
        <p>5️⃣ Decrypt your file anytime using the correct key.</p>
        <p><strong>Tip:</strong> Cryptify does not store any of your files or keys, ensuring maximum privacy.</p>
      </div>
      <div style={styles.helpBlock}>
        <h3 style={styles.helpHeading}>Understanding Encryption</h3>
        <p><strong>Key Size – Why Does It Matter?</strong></p>
        <p>A key is a secret value used in encryption. The longer the key, the stronger the encryption:</p>
        <p>AES: Supports 128-bit, 192-bit, and 256-bit keys (higher means more security).</p>
        <p>Blowfish: Supports key sizes from 32 to 448 bits (high flexibility).</p>
        <p>Twofish: Supports 128-bit, 192-bit, and 256-bit keys.</p>
        <p>3DES: Uses a 168-bit key but offers 112-bit effective security due to key repetition.</p>
        <p><strong>Recommendation:</strong> AES-256 is the most secure, while AES-128 provides great speed with strong security.</p>
        <p><strong>Block Size – What Is It?</strong></p>
        <p>A block size determines how much data an encryption algorithm processes at a time.</p>
        <p>AES & Twofish: Use a 128-bit block size (secure and efficient).</p>
        <p>Blowfish & 3DES: Use a 64-bit block size, which may be less secure for large files.</p>
        <p><strong>Larger block sizes improve security but may increase processing time.</strong></p>
        <p><strong>Initialization Vector (IV) – Why Is It Needed?</strong></p>
        <p>An Initialization Vector (IV) is a random value added to encryption to ensure the same plaintext doesn’t always produce the same ciphertext.</p>
        <p>IVs are used in Cipher Block Chaining (CBC) mode, which Cryptify supports.</p>
        <p>They add randomness and prevent patterns in encrypted data.</p>
        <p><strong>Note:</strong> IVs don’t need to be secret, but they must be unique for each encryption process.</p>
      </div>
      <div style={styles.helpBlock}>
        <h3 style={styles.helpHeading}>Frequently Asked Questions (FAQs)</h3>
        <p><strong>What file types can I encrypt?</strong></p>
        <p>You can encrypt text, PDFs, images, videos, presentations, and more.</p>
        <p><strong>How do I choose the right encryption algorithm?</strong></p>
        <p>AES – Best for strong security and performance.</p>
        <p>Blowfish – Fast and great for lightweight applications.</p>
        <p>Twofish – Secure, flexible, and a good alternative to AES.</p>
        <p>3DES – Slower but still used for legacy systems.</p>
        <p><strong>What happens if I lose my encryption key?</strong></p>
        <p>Cryptify does not store your keys for security reasons. If you lose your key, you cannot decrypt your file, so keep it safe!</p>
        <p><strong>Can I use my own encryption key?</strong></p>
        <p>Yes! You can generate a random key or input your own custom key for encryption.</p>
        <p><strong>Is my data stored on Cryptify’s servers?</strong></p>
        <p>No. Cryptify does not store or process data on external servers. All encryption and decryption happen locally on your device for maximum privacy.</p>
      </div>
      <div style={styles.helpBlock}>
        <h3 style={styles.helpHeading}>Troubleshooting</h3>
        <p><strong>My file isn’t decrypting properly. What should I do?</strong></p>
        <p>Make sure you’re using the correct encryption key.</p>
        <p>Verify that you selected the same encryption algorithm used for encryption.</p>
        <p>Ensure the file was not altered or corrupted after encryption.</p>
        <p><strong>The website isn’t working correctly. How can I fix it?</strong></p>
        <p>Try refreshing the page or using a different browser.</p>
        <p>Clear your browser cache and cookies.</p>
        <p>Ensure you have a stable internet connection.</p>
      </div>
      <div style={styles.helpBlock}>
        <h3 style={styles.helpHeading}>Need More Help?</h3>
        <p>If you have any issues or questions, feel free to contact us:</p>
        <p>📧 Email: xyz@gmail.com</p>
        <p>📞 Support: +91 9988776655</p>
        <p><strong>Secure your data with Cryptify – because your privacy matters!</strong></p>
      </div>
    </section>
  </div>
);

const HomePage = () => (
  <div style={styles.body}>
    <Loader />
    <VideoBackground />
    <Navbar />
    <Welcome />
    <Overview />
    <AboutUs />
    <Algorithms />
    <Footer />
  </div>
);

const App = () => {
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (location.pathname === "/") {
      setShowLoader(true);
      setTimeout(() => setShowLoader(false), 2000);
    } else {
      setShowLoader(false);
    }
  }, [location]);

  return (
    <>
      {showLoader && <Loader />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/encrypt" element={<EncryptPage />} />
        <Route path="/decrypt" element={<DecryptPage />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
    </>
  );
};

// Render App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);