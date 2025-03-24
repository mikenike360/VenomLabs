"use client";
import Spline from "@splinetool/react-spline";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      <Spline
        scene="https://prod.spline.design/YXWU-EVaVUJbbQtF/scene.splinecode"
        className="absolute inset-0 z-0"
      />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white text-center bg-black/50">
        <h1 className="text-5xl font-bold">Welcome to VenomLabs</h1>
        <p className="text-xl mt-4">Web3 + Next.js + 3D = 💀🔥</p>
        <button className="btn btn-primary mt-6">Get Started</button>
      </div>
    </div>
  );
}
