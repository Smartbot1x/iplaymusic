"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
/* import { IoIosRadio, IoIosHeart, IoIosMusicalNote } from "react-icons/io"; */

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const slides = [
    {
      title: "Where Words Fail,",
      subtitle: "Music Speaks",
      description:
        "Vivamus auctor dui dignissim, sollicitudin nunc ac, aliquam justo. Vestibulum pellentesque lacinia eleifend.",
      imgUrl: "/badges.png",
    },
    {
      title: "No Music",
      subtitle: "No Life",
      description:
        "Vivamus auctor dui dignissim, sollicitudin nunc ac, aliquam justo. Vestibulum pellentesque lacinia eleifend.",
    },
    {
      title: "Peace.Love",
      subtitle: "Music",
      description:
        "Vivamus auctor dui dignissim, sollicitudin nunc ac, aliquam justo. Vestibulum pellentesque lacinia eleifend.",
    },
  ];

  const totalSlides = slides.length;

  const handleSkip = () => {
    router.push("/playlist");
  };

  const handleNext = () => {
    if (currentIndex < totalSlides - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push("/");
    }
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return <></>;
}
