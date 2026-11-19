import { HookVariant, OpeningVariantProps } from "./config";
import ep9 from "../episodes/ep9/opening.props.json";

// Built by scripts/build_opening.py <ep>. Add new episodes here.
export const OPENINGS: Record<string, Record<HookVariant, OpeningVariantProps>> = {
  ep9: ep9 as unknown as Record<HookVariant, OpeningVariantProps>,
};
