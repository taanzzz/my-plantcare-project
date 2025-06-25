// src/components/ModelViewer.jsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useFBX } from '@react-three/drei';

// ModelLoader কম্পোনেন্ট
function ModelLoader({ modelPath }) {
  const fbx = useFBX(modelPath);
  // FBX মডেলের স্কেল প্রায়শই অ্যাডজাস্ট করতে হয়। আপনার মডেলের উপর নির্ভর করে এই মানটি পরিবর্তন করুন।
  return <primitive object={fbx} scale={0.01} />;
}

// ModelViewer কম্পোনেন্ট
function ModelViewer({ modelPath, initialCameraPosition = [2, 2, 2] }) {
  return (
    // এই div টি Canvas এর জন্য একটি নির্দিষ্ট আকার দেবে
    <div style={{ height: 'calc(100vh - 100px)', width: '100%', backgroundColor: '#f0f0f0' }}> {/* Navbar/Footer এর উচ্চতা বাদ দিতে calc() ব্যবহার করা হয়েছে */}
      <Canvas
        camera={{ position: initialCameraPosition, fov: 75 }}
      >
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
        <pointLight position={[-10, -10, -10]} />

        <Suspense fallback={null}> {/* লোডিং দেখানোর জন্য fallback-এ কিছু দিতে পারেন */}
          <ModelLoader modelPath={modelPath} />
        </Suspense>

        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default ModelViewer;