"use client";

import { useTeam } from "@/hooks/useQueries";
import { Users } from "lucide-react";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api").replace(/\/api\/?$/, "");

function getPhotoUrl(photo: string | null) {
  if (!photo) return null;
  if (photo.startsWith("http://") || photo.startsWith("https://")) return photo;
  return `${API_BASE}${photo.startsWith("/") ? "" : "/"}${photo}`;
}

export function TeamSection() {
  const { data: apiTeam } = useTeam();

  const fallbackTeam: any[] = [];

  const team = apiTeam && apiTeam.length > 0 ? apiTeam : fallbackTeam;

  return (
    <section className="section-padding bg-slate-50 border-t border-gray-100">
      <div className="container-page">
        <div className="text-center mb-8 md:mb-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B89A4A] mb-2">Our People</p>
          <h2 className="font-serif font-extrabold text-3xl md:text-4xl text-slate-900 leading-tight">
            The Team Behind the Technology
          </h2>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto mt-3 font-normal leading-relaxed">
            Certified professionals with deep domain expertise in hospitality IT, digital signage, and enterprise networking.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {team.map((member: any, i: number) => {
            const photoUrl = getPhotoUrl(member.photo);
            const initials = member.name
              .split(" ")
              .slice(0, 2)
              .map((w: string) => w[0])
              .join("")
              .toUpperCase();

            return (
              <div
                key={i}
                className="bg-white border border-gray-200/80 hover:border-[#B89A4A] transition-all duration-300 group hover:shadow-lg relative"
              >
                {/* Accent line top */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#B89A4A]/0 group-hover:bg-[#B89A4A] transition-colors duration-300" />

                {/* Photo */}
                <div className="h-52 bg-slate-100 flex items-center justify-center overflow-hidden relative">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt={member.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 select-none"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-20 h-20 bg-[#B89A4A]/10 border border-[#B89A4A]/30 flex items-center justify-center">
                        <span className="text-2xl font-black text-[#B89A4A]">{initials}</span>
                      </div>
                      <Users className="w-5 h-5 text-slate-300" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-serif font-bold text-lg text-slate-900 mb-0.5 group-hover:text-[#B89A4A] transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#B89A4A] mb-3">
                    {member.designation}
                  </p>
                  {member.brief && (
                    <p className="text-xs text-gray-500 leading-relaxed font-normal">{member.brief}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
