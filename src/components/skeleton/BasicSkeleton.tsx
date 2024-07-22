"use client";

import { Skeleton } from "antd";
import React from "react";

interface IBasicSkeletonProps {
	size?: "small" | "large" | "default" | undefined;
	shape?: "default" | "circle" | "square" | "round" | undefined;
}
const BasicSkeleton = ({ size, shape }: IBasicSkeletonProps) => {
	return (
		<Skeleton.Button active={true} size={size} shape={shape} block={true} />
	);
};

export default BasicSkeleton;
