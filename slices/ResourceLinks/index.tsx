import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ResourceLinks`.
 */
export type ResourceLinksProps = SliceComponentProps<Content.ResourceLinksSlice>;

/**
 * Component for "Resource Links" Slices.
 */
const ResourceLinks: FC<ResourceLinksProps> = ({ slice }) => {
	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			Placeholder component for {slice.slice_type} (variation: {slice.variation}) slices.
			<br />
			<strong>You can edit this slice directly in your code editor.</strong>
		</section>
	)
};

export default ResourceLinks