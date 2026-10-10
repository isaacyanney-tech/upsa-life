"use client";

import { useState } from "react";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const skinTones = [
  { label: "Deep", value: "#613b2b" },
  { label: "Dark brown", value: "#825238" },
  { label: "Brown", value: "#a66e49" },
  { label: "Light brown", value: "#c58d65" },
];

const hairstyles = ["Short", "Curly", "Afro"];

const clothingColors = [
  { label: "Teal", value: "#168b83" },
  { label: "Black", value: "#252832" },
  { label: "Blue", value: "#3265ad" },
  { label: "White", value: "#f3f1eb" },
  { label: "Red", value: "#c94747" },
];

type StudentAvatarProps = {
  skin: string;
  hair: string;
  shirt: string;
};

function StudentAvatar({
  skin,
  hair,
  shirt,
}: StudentAvatarProps) {
  const hairHeight =
    hair === "Afro" ? 0.4 : hair === "Curly" ? 0.27 : 0.16;

  const hairRadius = hair === "Afro" ? 0.48 : 0.39;

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={1.5} />
      <directionalLight
        position={[4, 7, 5]}
        intensity={2}
        castShadow
      />
      <directionalLight position={[-4, 3, -3]} intensity={0.7} />

      {/* Ground platform */}
      <mesh position={[0, -0.06, 0]} receiveShadow>
        <cylinderGeometry args={[1.7, 1.7, 0.12, 8]} />
        <meshStandardMaterial color="#e4e9e8" />
      </mesh>

      {/* Shoes */}
      <mesh position={[-0.19, 0.12, 0.08]} castShadow>
        <boxGeometry args={[0.25, 0.18, 0.4]} />
        <meshStandardMaterial color="#252832" />
      </mesh>

      <mesh position={[0.19, 0.12, 0.08]} castShadow>
        <boxGeometry args={[0.25, 0.18, 0.4]} />
        <meshStandardMaterial color="#252832" />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.19, 0.58, 0]} castShadow>
        <boxGeometry args={[0.24, 0.85, 0.3]} />
        <meshStandardMaterial color="#303d55" />
      </mesh>

      <mesh position={[0.19, 0.58, 0]} castShadow>
        <boxGeometry args={[0.24, 0.85, 0.3]} />
        <meshStandardMaterial color="#303d55" />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.42, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.15, 0.27, 7]} />
        <meshStandardMaterial color={skin} flatShading />
      </mesh>

      {/* Shirt / body */}
      <mesh position={[0, 1.12, 0]} castShadow>
        <cylinderGeometry args={[0.43, 0.34, 0.68, 6]} />
        <meshStandardMaterial color={shirt} flatShading />
      </mesh>

      {/* Arms */}
      <mesh
        position={[-0.48, 1.12, 0]}
        rotation={[0, 0, -0.15]}
        castShadow
      >
        <cylinderGeometry args={[0.12, 0.1, 0.62, 6]} />
        <meshStandardMaterial color={skin} flatShading />
      </mesh>

      <mesh
        position={[0.48, 1.12, 0]}
        rotation={[0, 0, 0.15]}
        castShadow
      >
        <cylinderGeometry args={[0.12, 0.1, 0.62, 6]} />
        <meshStandardMaterial color={skin} flatShading />
      </mesh>

      {/* Hands */}
      <mesh position={[-0.52, 0.78, 0]} castShadow>
        <sphereGeometry args={[0.13, 7, 6]} />
        <meshStandardMaterial color={skin} flatShading />
      </mesh>

      <mesh position={[0.52, 0.78, 0]} castShadow>
        <sphereGeometry args={[0.13, 7, 6]} />
        <meshStandardMaterial color={skin} flatShading />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.78, 0]} castShadow>
        <sphereGeometry args={[0.36, 8, 8]} />
        <meshStandardMaterial color={skin} flatShading />
      </mesh>

      {/* Hair */}
      <mesh position={[0, 2.02 + hairHeight * 0.15, -0.015]} castShadow>
        <sphereGeometry args={[hairRadius, 7, 6]} />
        <meshStandardMaterial color="#201c1b" flatShading />
      </mesh>

      {/* Front hairline */}
      <mesh position={[0, 1.98, 0.25]}>
        <boxGeometry args={[0.42, 0.09, 0.16]} />
        <meshStandardMaterial color="#201c1b" flatShading />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.12, 1.81, 0.32]}>
        <sphereGeometry args={[0.035, 6, 6]} />
        <meshStandardMaterial color="#171717" />
      </mesh>

      <mesh position={[0.12, 1.81, 0.32]}>
        <sphereGeometry args={[0.035, 6, 6]} />
        <meshStandardMaterial color="#171717" />
      </mesh>

      {/* Nose */}
      <mesh position={[0, 1.75, 0.35]}>
        <coneGeometry args={[0.055, 0.14, 5]} />
        <meshStandardMaterial color={skin} flatShading />
      </mesh>

      {/* Smile */}
      <mesh position={[0, 1.68, 0.32]}>
        <boxGeometry args={[0.12, 0.025, 0.025]} />
        <meshStandardMaterial color="#513329" />
      </mesh>
    </>
  );
}

type SavedStudent = {
  name: string;
  skin: string;
  hair: string;
  shirt: string;
  programme: string;
  level: string;
  createdAt: string;
};

export default function CreateStudentPage() {
  const [name, setName] = useState("");
  const [skin, setSkin] = useState(skinTones[1].value);
  const [hair, setHair] = useState("Short");
  const [shirt, setShirt] = useState(clothingColors[0].value);
  const [programme, setProgramme] = useState(
    "BSc Information Technology"
  );
  const [level, setLevel] = useState("100");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function createStudent(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setMessage("");
    setError("");

    const student: SavedStudent = {
      name: name.trim(),
      skin,
      hair,
      shirt,
      programme,
      level,
      createdAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(
        "upsaLifeStudent",
        JSON.stringify(student)
      );

      setMessage(
        `Welcome to UPSA Life, ${student.name}! Your student profile has been saved on this browser.`
      );
    } catch {
      setError(
        "We couldn't save your profile. Check your browser storage settings and try again."
      );
    }
  }

  return (
    <main className="min-h-screen bg-[#f3f6f5] text-slate-900">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-5 md:px-10">
        <Link
          href="/"
          className="text-xl font-black tracking-tight"
        >
          UPSA <span className="text-teal-600">LIFE</span>
        </Link>

        <span className="text-sm font-medium text-slate-500">
          Student Creator
        </span>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
        {/* Page introduction */}
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
            Your journey starts here
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">
            Create your student
          </h1>

          <p className="mt-3 max-w-xl text-slate-600">
            Design your character, choose your programme, and
            prepare to experience life at UPSA.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* 3D Avatar Preview */}
          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between px-5 pt-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-teal-700">
                  Live preview
                </p>

                <h2 className="mt-1 text-lg font-extrabold">
                  {name.trim() || "Your character"}
                </h2>
              </div>

              <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800">
                3D Avatar
              </span>
            </div>

            <div className="h-95 w-full">
              <Canvas
                camera={{
                  position: [3.7, 2.6, 5.5],
                  fov: 38,
                }}
              >
                <color
                  attach="background"
                  args={["#edf4f2"]}
                />

                <StudentAvatar
                  skin={skin}
                  hair={hair}
                  shirt={shirt}
                />

                <OrbitControls
                  enablePan={false}
                  minDistance={3}
                  maxDistance={8}
                  minPolarAngle={0.5}
                  maxPolarAngle={Math.PI / 2}
                  target={[0, 1.1, 0]}
                />
              </Canvas>
            </div>

            <p className="px-5 pb-5 text-center text-xs text-slate-500">
              Drag to rotate your character.
            </p>
          </section>

          {/* Character Creation Form */}
          <form
            onSubmit={createStudent}
            className="space-y-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-7"
          >
            <div>
              <h2 className="text-xl font-extrabold">
                Student details
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Tell us who you are.
              </p>
            </div>

            {/* Name */}
            <div>
              <label
                htmlFor="student-name"
                className="mb-2 block text-sm font-bold"
              >
                Character name
              </label>

              <input
                id="student-name"
                required
                maxLength={30}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your character name"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              />
            </div>

            {/* Programme */}
            <div>
              <label
                htmlFor="programme"
                className="mb-2 block text-sm font-bold"
              >
                Programme
              </label>

              <select
                id="programme"
                value={programme}
                onChange={(event) =>
                  setProgramme(event.target.value)
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-teal-600"
              >
                <option>BSc Information Technology</option>
                <option>BSc Information Systems</option>
                <option>BSc Accounting</option>
                <option>BSc Banking and Finance</option>
                <option>BSc Marketing</option>
                <option>BSc Business Administration</option>
                <option>BSc Economics</option>
                <option>Other programme</option>
              </select>
            </div>

            {/* Academic Level */}
            <div>
              <label
                htmlFor="level"
                className="mb-2 block text-sm font-bold"
              >
                Academic level
              </label>

              <select
                id="level"
                value={level}
                onChange={(event) =>
                  setLevel(event.target.value)
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-teal-600"
              >
                <option value="100">Level 100</option>
                <option value="200">Level 200</option>
                <option value="300">Level 300</option>
                <option value="400">Level 400</option>
              </select>
            </div>

            {/* Skin Tone */}
            <div>
              <p className="mb-3 text-sm font-bold">Skin tone</p>

              <div className="flex flex-wrap gap-3">
                {skinTones.map((tone) => (
                  <button
                    key={tone.value}
                    type="button"
                    title={tone.label}
                    aria-label={tone.label}
                    aria-pressed={skin === tone.value}
                    onClick={() => setSkin(tone.value)}
                    className={`h-10 w-10 rounded-full border-2 ${
                      skin === tone.value
                        ? "border-teal-600 ring-2 ring-teal-200"
                        : "border-white shadow"
                    }`}
                    style={{ backgroundColor: tone.value }}
                  />
                ))}
              </div>
            </div>

            {/* Hairstyle */}
            <div>
              <p className="mb-3 text-sm font-bold">Hairstyle</p>

              <div className="grid grid-cols-3 gap-2">
                {hairstyles.map((style) => (
                  <button
                    key={style}
                    type="button"
                    aria-pressed={hair === style}
                    onClick={() => setHair(style)}
                    className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                      hair === style
                        ? "border-teal-600 bg-teal-50 text-teal-800"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Clothing Color */}
            <div>
              <p className="mb-3 text-sm font-bold">
                Clothing color
              </p>

              <div className="flex flex-wrap gap-3">
                {clothingColors.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    title={color.label}
                    aria-label={color.label}
                    aria-pressed={shirt === color.value}
                    onClick={() => setShirt(color.value)}
                    className={`h-10 w-10 rounded-full border-2 ${
                      shirt === color.value
                        ? "border-teal-600 ring-2 ring-teal-200"
                        : "border-white shadow"
                    }`}
                    style={{ backgroundColor: color.value }}
                  />
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl bg-teal-700 px-5 py-4 font-bold text-white transition hover:bg-teal-800"
            >
              Create My Student
            </button>

            {message && (
              <p
                role="status"
                className="rounded-xl bg-teal-50 p-4 text-sm font-medium text-teal-900"
              >
                {message}
              </p>
            )}

            {error && (
              <p
                role="alert"
                className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-800"
              >
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}