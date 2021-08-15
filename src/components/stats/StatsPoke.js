import '../stats/statsPoke.css'

const StatsPoke = ({title, content}) => {
  return (
    <div className='statsPoke'>
        <p>{title}: <span>{content}</span> </p>
    </div>
  )
}

export default StatsPoke
