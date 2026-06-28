function EmptyState({ title, description, action }) {
  return (
    <div className="card text-center">
      <h3 className="heading-md">{title}</h3>
      {description && <p className="text-body mt-3">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

export default EmptyState
