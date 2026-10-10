
"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

type StudentProfile = {
  name: string;
  skin: string;
  hair: string;
  shirt: string;
  programme: string;
  level: string;
};

type RoomObject = "Bed" | "Study Desk" | "Wardrobe" | "Computer";

const STORAGE_KEY = "upsaLifeStudent";
const STUDENT_EVENT = "upsaLifeStudentChanged";

function subscribeToStudent(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  window.addEventListener("storage", callback);
  window.addEventListener(STUDENT_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(STUDENT_EVENT, callback);
  };
}

function getStudentSnapshot(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function getServerStudentSnapshot(): null {
  return null;
}

function parseStudentProfile(value: string | null): StudentProfile | null {
  if (!value) return null;

  try {
    const parsed: unknown = JSON.parse(value);
    if (!parsed || typeof parsed !== "object") return null;

    const profile = parsed as Record<string, unknown>;
    const fields = ["name", "skin", "hair", "shirt", "programme", "level"];

    if (!fields.every((field) => typeof profile[field] === "string")) {
      return null;
    }

    return {
      name: profile.name as string,
      skin: profile.skin as string,
      hair: profile.hair as string,
      shirt: profile.shirt as string,
      programme: profile.programme as string,
      level: profile.level as string,
    };
  } catch {
    return null;
  }
}

function PlayerAvatar({ student }: { student: StudentProfile }) {
  const skinMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: student.skin }),
    [student.skin]
  );
  const shirtMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: student.shirt }),
    [student.shirt]
  );
  const hairMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#24201f" }),
    []
  );
  const trousersMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#303b54" }),
    []
  );
  const shoeMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#222222" }),
    []
  );

  return (
    <group position={[0, 0, 2.5]} scale={0.78}>
      <mesh position={[-0.16, 0.48, 0]} material={trousersMaterial}>
        <boxGeometry args={[0.2, 0.65, 0.25]} />
      </mesh>
      <mesh position={[0.16, 0.48, 0]} material={trousersMaterial}>
        <boxGeometry args={[0.2, 0.65, 0.25]} />
      </mesh>
      <mesh position={[-0.16, 0.12, 0.06]} material={shoeMaterial}>
        <boxGeometry args={[0.22, 0.12, 0.35]} />
      </mesh>
      <mesh position={[0.16, 0.12, 0.06]} material={shoeMaterial}>
        <boxGeometry args={[0.22, 0.12, 0.35]} />
      </mesh>
      <mesh position={[0, 1.05, 0]} material={shirtMaterial}>
        <boxGeometry args={[0.68, 0.72, 0.35]} />
      </mesh>
      <mesh
        position={[-0.44, 1.02, 0]}
        rotation={[0, 0, -0.12]}
        material={skinMaterial}
      >
        <boxGeometry args={[0.18, 0.65, 0.2]} />
      </mesh>
      <mesh
        position={[0.44, 1.02, 0]}
        rotation={[0, 0, 0.12]}
        material={skinMaterial}
      >
        <boxGeometry args={[0.18, 0.65, 0.2]} />
      </mesh>
      <mesh position={[0, 1.48, 0]} material={skinMaterial}>
        <cylinderGeometry args={[0.11, 0.11, 0.2, 8]} />
      </mesh>
      <mesh position={[0, 1.75, 0]} material={skinMaterial}>
        <boxGeometry args={[0.42, 0.48, 0.38]} />
      </mesh>
      <mesh
        position={[0, 2.01, 0]}
        material={hairMaterial}
        scale={
          student.hair === "Afro"
            ? [1.3, 0.75, 1.25]
            : student.hair === "Curly"
              ? [1.12, 0.65, 1.12]
              : [1.02, 0.38, 1.02]
        }
      >
        <sphereGeometry args={[0.23, 8, 6]} />
      </mesh>
      <mesh position={[-0.09, 1.78, 0.195]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#171717" />
      </mesh>
      <mesh position={[0.09, 1.78, 0.195]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#171717" />
      </mesh>
    </group>
  );
}

function RoomScene({
  student,
  onSelectObject,
}: {
  student: StudentProfile | null;
  onSelectObject: (object: RoomObject) => void;
}) {
  const wallMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#e7e2d8" }),
    []
  );
  const floorMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#b58a61" }),
    []
  );
  const woodMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#825536" }),
    []
  );
  const lightWoodMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#bd9164" }),
    []
  );
  const mattressMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#f1f0e9" }),
    []
  );
  const blanketMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#4b8e91" }),
    []
  );
  const metalMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#34383d" }),
    []
  );
  const screenMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#4a9cbb",
        emissive: "#153442",
        emissiveIntensity: 0.5,
      }),
    []
  );

  return (
    <>
      <color attach="background" args={["#c9d7df"]} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 8, 5]} intensity={2} castShadow />

      <mesh
        position={[0, -0.08, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={floorMaterial}
        receiveShadow
      >
        <planeGeometry args={[10, 10]} />
      </mesh>

      {Array.from({ length: 9 }, (_, i) => (
        <mesh
          key={i}
          position={[-4.5 + i, -0.065, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <boxGeometry args={[0.018, 10, 0.01]} />
          <meshStandardMaterial color="#916b4d" />
        </mesh>
      ))}

      <mesh position={[0, 2, -3]} material={wallMaterial}>
        <boxGeometry args={[10, 4, 0.2]} />
      </mesh>
      <mesh position={[-5, 2, 0]} material={wallMaterial}>
        <boxGeometry args={[0.2, 4, 6]} />
      </mesh>

      {/* Window */}
      <mesh position={[-1.5, 2.45, -2.86]}>
        <boxGeometry args={[2, 1.5, 0.08]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-1.5, 2.45, -2.8]}>
        <boxGeometry args={[1.82, 1.32, 0.04]} />
        <meshStandardMaterial color="#86c5e8" />
      </mesh>
      <mesh position={[-1.5, 2.45, -2.75]}>
        <boxGeometry args={[0.07, 1.35, 0.05]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-1.5, 2.45, -2.74]}>
        <boxGeometry args={[1.85, 0.07, 0.05]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Bed */}
      <group
        position={[2.6, 0, -1.4]}
        onClick={(event) => {
          event.stopPropagation();
          onSelectObject("Bed");
        }}
      >
        <mesh position={[0, 0.28, 0]} material={woodMaterial}>
          <boxGeometry args={[2.2, 0.45, 1.3]} />
        </mesh>
        <mesh position={[0, 0.55, 0]} material={mattressMaterial}>
          <boxGeometry args={[2.12, 0.16, 1.23]} />
        </mesh>
        <mesh position={[0, 0.66, -0.25]} material={blanketMaterial}>
          <boxGeometry args={[1.5, 0.08, 0.7]} />
        </mesh>
        <mesh position={[0.65, 0.68, 0.35]} material={mattressMaterial}>
          <boxGeometry args={[0.45, 0.12, 0.3]} />
        </mesh>
      </group>

      {/* Study desk and computer */}
      <group
        position={[-2.5, 0, -1.8]}
        onClick={(event) => {
          event.stopPropagation();
          onSelectObject("Study Desk");
        }}
      >
        <mesh position={[0, 0.9, 0]} material={lightWoodMaterial}>
          <boxGeometry args={[1.8, 0.14, 0.85]} />
        </mesh>
        {[-0.72, 0.72].map((x) => (
          <mesh key={x} position={[x, 0.43, 0]} material={woodMaterial}>
            <boxGeometry args={[0.12, 0.85, 0.65]} />
          </mesh>
        ))}
        <group
          onClick={(event) => {
            event.stopPropagation();
            onSelectObject("Computer");
          }}
        >
          <mesh position={[0, 1.35, -0.15]} material={metalMaterial}>
            <boxGeometry args={[0.85, 0.55, 0.08]} />
          </mesh>
          <mesh position={[0, 1.35, -0.1]} material={screenMaterial}>
            <boxGeometry args={[0.73, 0.42, 0.04]} />
          </mesh>
          <mesh position={[0, 1.02, 0.12]} material={metalMaterial}>
            <boxGeometry args={[0.5, 0.04, 0.25]} />
          </mesh>
        </group>
      </group>

      {/* Chair */}
      <group position={[-2.5, 0, -0.65]}>
        <mesh position={[0, 0.48, 0]}>
          <boxGeometry args={[0.65, 0.12, 0.6]} />
          <meshStandardMaterial color="#303e50" />
        </mesh>
        <mesh position={[0, 0.78, -0.22]}>
          <boxGeometry args={[0.65, 0.55, 0.12]} />
          <meshStandardMaterial color="#303e50" />
        </mesh>
        <mesh position={[0, 0.23, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.4, 8]} />
          <meshStandardMaterial color="#444444" />
        </mesh>
      </group>

      {/* Wardrobe */}
      <group
        position={[3.9, 0, -2.3]}
        onClick={(event) => {
          event.stopPropagation();
          onSelectObject("Wardrobe");
        }}
      >
        <mesh position={[0, 1.1, 0]} material={woodMaterial}>
          <boxGeometry args={[1.1, 2.2, 0.8]} />
        </mesh>
        <mesh position={[-0.27, 1.1, 0.42]}>
          <boxGeometry args={[0.5, 2.05, 0.04]} />
          <meshStandardMaterial color="#a7794d" />
        </mesh>
        <mesh position={[0.27, 1.1, 0.42]}>
          <boxGeometry args={[0.5, 2.05, 0.04]} />
          <meshStandardMaterial color="#a7794d" />
        </mesh>
        <mesh position={[0, 1.1, 0.47]}>
          <boxGeometry args={[0.025, 1.95, 0.025]} />
          <meshStandardMaterial color="#51351f" />
        </mesh>
      </group>

      {/* Bedside table */}
      <group position={[1.25, 0, -2]}>
        <mesh position={[0, 0.42, 0]} material={lightWoodMaterial}>
          <boxGeometry args={[0.6, 0.8, 0.55]} />
        </mesh>
        <mesh position={[0, 0.85, 0]} material={woodMaterial}>
          <boxGeometry args={[0.65, 0.08, 0.6]} />
        </mesh>
      </group>

      {/* Rug */}
      <mesh position={[0, -0.02, 1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial color="#d4b7a0" />
      </mesh>

      {/* Plant */}
      <group position={[-4, 0, 1.8]}>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.23, 0.17, 0.4, 8]} />
          <meshStandardMaterial color="#b65f42" />
        </mesh>
        {[
          [-0.15, 0.7, 0],
          [0.1, 0.82, 0.04],
          [0, 0.95, -0.1],
          [0.14, 0.68, -0.08],
        ].map((position, index) => (
          <mesh
            key={index}
            position={position as [number, number, number]}
          >
            <sphereGeometry args={[0.23, 6, 5]} />
            <meshStandardMaterial color="#4e8b55" />
          </mesh>
        ))}
      </group>

      {student && <PlayerAvatar student={student} />}

      <OrbitControls
        makeDefault
        target={[0, 1, 0]}
        minDistance={5}
        maxDistance={13}
        maxPolarAngle={Math.PI / 2.05}
      />
    </>
  );
}

function StatusBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="font-bold tabular-nums">{value}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-[#23877d] transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function StudentRoom() {
  const savedStudentJSON = useSyncExternalStore(
    subscribeToStudent,
    getStudentSnapshot,
    getServerStudentSnapshot
  );

  const student = useMemo(
    () => parseStudentProfile(savedStudentJSON),
    [savedStudentJSON]
  );

  const [energy, setEnergy] = useState(82);
  const [happiness, setHappiness] = useState(76);
  const [cleanliness, setCleanliness] = useState(90);
  const [selectedObject, setSelectedObject] = useState<RoomObject | null>(null);
  const [message, setMessage] = useState(
    "Welcome to your room. Click furniture to interact with it."
  );

  function handleObjectSelect(object: RoomObject) {
    setSelectedObject(object);

    const messages: Record<RoomObject, string> = {
      Bed: "You selected the bed. Use Rest to recover energy.",
      "Study Desk": "You selected your study desk. Get ready to study.",
      Wardrobe: "You selected the wardrobe. Your clothes are stored here.",
      Computer:
        "You selected the computer. A study and work feature can be added here.",
    };

    setMessage(messages[object]);
  }

  function rest() {
    setEnergy((current) => Math.min(100, current + 18));
    setMessage("You rested in your room. Your energy improved.");
  }

  function study() {
    setEnergy((current) => Math.max(0, current - 10));
    setHappiness((current) => Math.max(0, current - 2));
    setMessage(
      "You studied at your desk. A full academic progress system will come next."
    );
  }

  function tidyUp() {
    setCleanliness((current) => Math.min(100, current + 12));
    setHappiness((current) => Math.min(100, current + 3));
    setMessage("You tidied up your room. Cleanliness improved.");
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#f3f1ec] text-[#242424]">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 bg-white px-5 py-4 md:px-8">
        <div>
          <Link
            href="/dashboard"
            className="text-xl font-black tracking-[0.12em] text-[#166c67]"
          >
            UPSA LIFE
          </Link>
          <p className="mt-1 text-sm text-gray-500">Your student room</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/create-student"
            className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold hover:bg-gray-50"
          >
            Edit Student
          </Link>
          <Link
            href="/dashboard"
            className="rounded-xl bg-[#166c67] px-4 py-2 text-sm font-semibold text-white hover:bg-[#105550]"
          >
            Dashboard
          </Link>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-5 p-4 md:p-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 px-5 py-4">
            <div>
              <h1 className="text-lg font-bold">My Hostel Room</h1>
              <p className="text-sm text-gray-500">
                Drag to rotate · Scroll to zoom · Click furniture to interact
              </p>
            </div>
            <span className="rounded-full bg-[#e5f3ee] px-3 py-1 text-xs font-semibold text-[#166c67]">
              3D ROOM
            </span>
          </div>

          <div className="h-[420px] w-full bg-[#c9d7df] sm:h-[540px] lg:h-[620px]">
            <Canvas
              camera={{ position: [8, 7, 9], fov: 45 }}
              shadows
              dpr={[1, 1.75]}
            >
              <RoomScene
                student={student}
                onSelectObject={handleObjectSelect}
              />
            </Canvas>
          </div>

          <div className="border-t border-black/10 bg-[#faf9f6] px-5 py-4">
            <p className="text-sm text-gray-600">{message}</p>
            {selectedObject && (
              <p className="mt-1 text-sm font-semibold text-[#166c67]">
                Selected: {selectedObject}
              </p>
            )}
          </div>
        </div>

        <aside className="grid min-w-0 content-start gap-5">
          <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Student Profile</h2>
            {student ? (
              <>
                <div className="mt-4 flex items-center gap-3">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl font-black text-white"
                    style={{ backgroundColor: student.shirt }}
                  >
                    {student.name.trim().charAt(0).toUpperCase() || "S"}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-bold">{student.name}</p>
                    <p className="text-sm text-gray-500">
                      Level {student.level}
                    </p>
                  </div>
                </div>
                <p className="mt-4 break-words text-sm text-gray-600">
                  {student.programme}
                </p>
              </>
            ) : (
              <div className="mt-4">
                <p className="text-sm leading-6 text-gray-600">
                  You haven&apos;t created your student character yet. Create a
                  profile to see your character in this room.
                </p>
                <Link
                  href="/create-student"
                  className="mt-4 inline-flex rounded-xl bg-[#166c67] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#105550]"
                >
                  Create My Student
                </Link>
              </div>
            )}
          </section>

          <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Student Needs</h2>
            <p className="mt-1 text-sm text-gray-500">
              Prototype values for now.
            </p>
            <div className="mt-5 space-y-4">
              <StatusBar label="Energy" value={energy} />
              <StatusBar label="Happiness" value={happiness} />
              <StatusBar label="Cleanliness" value={cleanliness} />
            </div>
          </section>

          <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Room Actions</h2>
            <p className="mt-1 text-sm text-gray-500">
              Choose what your student does next.
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3">
              <button
                type="button"
                onClick={rest}
                className="flex w-full items-center justify-between rounded-2xl border border-gray-200 p-4 text-left transition hover:border-[#166c67] hover:bg-[#f5fbf9]"
              >
                <span>
                  <span className="block font-semibold">Rest</span>
                  <span className="mt-1 block text-xs text-gray-500">
                    Recover energy
                  </span>
                </span>
                <span className="text-xl text-[#166c67]">›</span>
              </button>

              <button
                type="button"
                onClick={study}
                className="flex w-full items-center justify-between rounded-2xl border border-gray-200 p-4 text-left transition hover:border-[#166c67] hover:bg-[#f5fbf9]"
              >
                <span>
                  <span className="block font-semibold">Study</span>
                  <span className="mt-1 block text-xs text-gray-500">
                    Spend time at the desk
                  </span>
                </span>
                <span className="text-xl text-[#166c67]">›</span>
              </button>

              <button
                type="button"
                onClick={tidyUp}
                className="flex w-full items-center justify-between rounded-2xl border border-gray-200 p-4 text-left transition hover:border-[#166c67] hover:bg-[#f5fbf9]"
              >
                <span>
                  <span className="block font-semibold">Tidy Up</span>
                  <span className="mt-1 block text-xs text-gray-500">
                    Improve room cleanliness
                  </span>
                </span>
                <span className="text-xl text-[#166c67]">›</span>
              </button>
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}
