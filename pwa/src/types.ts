export type Animation = StaticAnimation | MulticolorAnimation;

export type Color = {
  r: number;
  g: number;
  b: number;
  percentage?: number;
}

export type MulticolorAnimation = {
  name: string;
  brightness: number;
  colors: Color[];
};

export type StaticAnimation = {
  name: string;
  brightness: number;
  color: Color;
};

export type Device = {
  on: boolean;
  name: string;
  display: string;
  current_animation: string;
  animation: Animation;
};

export type Room = {
  devices: string[];
  display: string;
  name: string;
};
