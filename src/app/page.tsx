import { ModeToggle } from '~/components/mode-toggle'
import { Button } from '~/components/ui/button'

export default function Home() {
  return (
    <div className="container p-5">
      <Button>Test</Button>
      <ModeToggle />
    </div>
  )
}
