export const themeKey = "assessment-workspace:theme:v1";
export type ThemePreference = "system" | "light" | "dark";
export const themeBootstrap = `(function(){var p='system';try{var s=localStorage.getItem('${themeKey}');if(s==='light'||s==='dark'||s==='system')p=s}catch(e){}var d=document.documentElement;d.dataset.themePreference=p;d.dataset.theme=p==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):p;})();`;
