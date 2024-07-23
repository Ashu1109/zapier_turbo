

export default function HeroVideo  ():JSX.Element {
    return <div className="flex justify-center">
        <video autoPlay className="max-w-4xl" controls={false} loop muted src="https://res.cloudinary.com/zapier-media/video/upload/f_auto,q_auto/v1706042175/Homepage%20ZAP%20Jan%2024/012324_Homepage_Hero1_1920x1080_pwkvu4.mp4" />
    </div>
}