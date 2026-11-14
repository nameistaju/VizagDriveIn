export interface StreetViewSpot {
  id: "indoor" | "cricket" | "outdoor" | "pool";
  label: string;
  src: string;
}

export const STREET_VIEWS: Record<StreetViewSpot["id"], StreetViewSpot> = {
  indoor: {
    id: "indoor",
    label: "Indoor AC seating",
    src: "https://www.google.com/maps/embed?pb=!4v1794588687019!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJREtzSjdyNmdF!2m2!1d17.73175383724974!2d83.34111660016333!3f228.1658816384069!4f-8.272453686601992!5f0.7820865974627469",
  },
  cricket: {
    id: "cricket",
    label: "Box cricket",
    src: "https://www.google.com/maps/embed?pb=!4v1794588737153!6m8!1m7!1sCAoSFENJSE0wb2dLRUlDQWdJREtzSjRZ!2m2!1d17.73185025129187!2d83.34125615237608!3f233.41490027458087!4f7.898582215884687!5f0.7820865974627469",
  },
  outdoor: {
    id: "outdoor",
    label: "Outside seating",
    src: "https://www.google.com/maps/embed?pb=!4v1794588800732!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJREtzSjdXWGc.!2m2!1d17.73156041398279!2d83.3411012665294!3f90.77082460404482!4f10.61392127790721!5f0.7820865974627469",
  },
  pool: {
    id: "pool",
    label: "8-ball pool",
    src: "https://www.google.com/maps/embed?pb=!4v1794588855842!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJREtzSjdXZ2dF!2m2!1d17.73187916029794!2d83.34118609084138!3f247.18063919571364!4f-1.861289219181387!5f0.7820865974627469",
  },
};
